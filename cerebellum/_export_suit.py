"""Export SUIT Anatom labels to GLBs in Z-Anatomy cerebellum space."""
from __future__ import annotations

import json
import struct
from pathlib import Path

import nibabel as nb
import numpy as np
import trimesh
from skimage.measure import marching_cubes
from skimage.morphology import ball, binary_closing

NII = Path(r"C:\Users\Omar Garagozov\Desktop\cerebellar_atlas_dl\atl-Anatom_space-SUIT_dseg.nii")
OUT = Path(r"C:\Users\Omar Garagozov\neural-network-simulator\neuron-viewer5\cerebellum")
CEREB_GLB = Path(
    r"C:\Users\Omar Garagozov\neural-network-simulator\neuron-viewer5\cerebral-cortex\Cerebellum.glb"
)

# SUIT Anatom index -> teaching key. L/R (and some vermis pairs) are merged.
MERGES: dict[str, list[int]] = {
    "Culmen": [1, 2],  # I–IV; midline vs wing split below
    "Anterior_quadrangular_lobule": [3, 4],  # V
    "Declive": [6],
    "Posterior_quadrangular_lobule": [5, 7],  # VI hemispheres
    "Folium_of_vermis": [9],
    "Superior_semilunar_lobule": [8, 10],
    "Tuber_of_vermis": [12, 15],  # Vermis CrusII + Vermis VIIb
    "Inferior_semilunar_lobule": [11, 13],
    "Gracile_lobule": [14, 16],  # VIIb hemispheres
    "Pyramis_of_vermis": [18, 21],
    "Biventral_lobule": [17, 19, 20, 22],  # VIIIa/b hemispheres
    "Uvula_of_vermis": [24],
    "Tonsil_of_cerebellum": [23, 25],
    "Nodule_of_vermis": [27],
    "Flocculus": [26, 28],
    "Dentate_nucleus": [29, 30],
    "Interposed_nucleus": [31, 32],
    "Fastigial_nucleus": [33, 34],
}

WING_X_MM = 8.0


def glb_position_bounds(path: Path) -> tuple[np.ndarray, np.ndarray]:
    with path.open("rb") as f:
        f.read(12)
        chunk_len, _ = struct.unpack("<I4s", f.read(8))
        gltf = json.loads(f.read(chunk_len))
    mins, maxs = [], []
    for acc in gltf.get("accessors", []):
        if acc.get("type") == "VEC3" and "min" in acc and "max" in acc:
            mins.append(acc["min"])
            maxs.append(acc["max"])
    return np.min(mins, axis=0), np.max(maxs, axis=0)


def mask_to_mesh(mask: np.ndarray, affine: np.ndarray) -> trimesh.Trimesh | None:
    if int(mask.sum()) < 20:
        return None
    closed = binary_closing(mask, ball(1))
    if int(closed.sum()) < 20:
        closed = mask
    try:
        verts, faces, *_ = marching_cubes(closed.astype(np.float32), level=0.5)
    except ValueError:
        return None
    # marching_cubes verts are (z, y, x) in array index space for skimage? 
    # skimage returns verts in (row, col, dim) = (i, j, k) matching array axes 0,1,2.
    ones = np.ones((len(verts), 1))
    world = (affine @ np.hstack([verts, ones]).T).T[:, :3]
    mesh = trimesh.Trimesh(vertices=world, faces=faces, process=True)
    mesh.remove_unreferenced_vertices()
    return mesh


def ras_mm_to_za(verts_mm: np.ndarray, offset: np.ndarray) -> np.ndarray:
    out = np.empty_like(verts_mm)
    out[:, 0] = verts_mm[:, 0] / 1000.0
    out[:, 1] = verts_mm[:, 2] / 1000.0 + offset[1]
    out[:, 2] = verts_mm[:, 1] / 1000.0 + offset[2]
    return out


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    img = nb.load(str(NII))
    data = np.rint(img.get_fdata()).astype(np.int16)
    affine = img.affine

    ijk = np.array(np.where(data > 0)).T
    ras = (affine @ np.hstack([ijk, np.ones((len(ijk), 1))]).T).T[:, :3]
    suit_min, suit_max = ras.min(0), ras.max(0)
    za_min, za_max = glb_position_bounds(CEREB_GLB)
    suit_c = (suit_min + suit_max) / 2.0
    za_c = (za_min + za_max) / 2.0
    # After axis permute: x stays x/1000, y <- z/1000, z <- y/1000
    permuted_c = np.array([suit_c[0] / 1000.0, suit_c[2] / 1000.0, suit_c[1] / 1000.0])
    offset = np.array([0.0, za_c[1] - permuted_c[1], za_c[2] - permuted_c[2]])
    print("offset", offset)
    print("SUIT mm", suit_min, suit_max)
    print("ZA m  ", za_min, za_max)

    exported = []
    for key, labels in MERGES.items():
        mask = np.isin(data, labels)
        if key == "Culmen":
            # Split I–IV into midline vermis (Culmen) and hemispheric wings.
            wing = np.zeros_like(mask, dtype=bool)
            verts_idx = np.array(np.where(mask)).T
            if len(verts_idx):
                ras_pts = (affine @ np.hstack([verts_idx, np.ones((len(verts_idx), 1))]).T).T[:, :3]
                for (i, j, k), x_mm in zip(verts_idx, ras_pts[:, 0], strict=True):
                    if abs(x_mm) > WING_X_MM:
                        wing[i, j, k] = True
            culmen_mask = mask & ~wing
            for sub_key, sub_mask in (("Culmen", culmen_mask), ("Wing_of_central_lobule", wing)):
                mesh = mask_to_mesh(sub_mask, affine)
                if mesh is None:
                    print("SKIP", sub_key)
                    continue
                mesh.vertices = ras_mm_to_za(mesh.vertices, offset)
                out_path = OUT / f"{sub_key}.glb"
                mesh.export(out_path)
                print(sub_key, "faces", len(mesh.faces), "m", mesh.bounds)
                exported.append(sub_key)
            continue

        mesh = mask_to_mesh(mask, affine)
        if mesh is None:
            print("SKIP", key)
            continue
        mesh.vertices = ras_mm_to_za(mesh.vertices, offset)
        out_path = OUT / f"{key}.glb"
        mesh.export(out_path)
        print(key, "faces", len(mesh.faces), "m", mesh.bounds)
        exported.append(key)

    print("exported", len(exported), exported)


if __name__ == "__main__":
    main()
