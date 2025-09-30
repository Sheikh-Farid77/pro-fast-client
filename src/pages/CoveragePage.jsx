import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const districts = {
  dhaka: [23.8103, 90.4125],
  chattogram: [22.3569, 91.7832],
  khulna: [22.8456, 89.5403],
  rajshahi: [24.3636, 88.6241],
  sylhet: [24.8949, 91.8687],
  barishal: [22.701, 90.3535],
  rangpur: [25.7439, 89.2752],
  mymensingh: [24.7471, 90.4203],

  barguna: [22.1292, 90.0475],
  bandarban: [21.9517, 92.2146],
  bhola: [22.6879, 90.6564],
  bogura: [24.8519, 89.3717],
  brahmanbaria: [23.9778, 91.1356],
  chapai_nawabganj: [24.7186, 88.1554],
  chandpur: [23.2158, 90.674],
  cumilla: [23.4604, 91.1809],
  coxsbazar: [21.4391, 92.0058],
  faridpur: [23.607, 89.7835], // typo: “faridpur”

  feni: [22.927, 91.3969],
  gaibandha: [25.3487, 89.5533],
  gazipur: [24.1126, 90.4278],
  gopalganj: [23.0056, 89.8225],
  habiganj: [24.5426, 91.4165],
  jamalpur: [24.9262, 89.9371],
  jashore: [23.1833, 89.1833],
  jhalokati: [22.6472, 90.2167],
  jhenaidah: [23.5497, 89.1652],
  joypurhat: [25.0926, 89.0169],
  khagrachari: [23.1194, 91.987],
  kishoreganj: [24.43, 90.776],

  kurigram: [25.801, 89.633],
  kushtia: [23.9007, 89.1206],
  lakshmipur: [22.95, 90.85],
  lalmonirhat: [26.3536, 89.4],
  madaripur: [23.1667, 90.1833],
  magura: [23.4856, 89.4197],
  manikganj: [23.8667, 89.8333],
  meherpur: [23.75, 88.6333],
  moulvibazar: [24.4769, 92.0068],

  munshiganj: [23.4825, 90.176],
  netrokona: [24.875, 90.7538],
  nilphamari: [25.9333, 88.7667],
  noakhali: [22.8167, 91.1],
  pabna: [24.0167, 89.25],
  panchagarh: [26.3413, 88.5621],
  patuakhali: [22.363, 90.3294],
  pirojpur: [22.5833, 89.9667],

  rajbari: [23.7833, 89.9167],
  rangamati: [22.6244, 92.2147],
  satkhira: [22.7167, 89.0833],
  shariatpur: [23.25, 90.3],
  sherpur: [25.02, 90.0167],
  sirajganj: [24.4516, 89.7097],

  sunamganj: [25.0667, 91.4],
  tangail: [24.25, 89.9167],
  thakurgaon: [26.0167, 88.4667],
  natore: [24.4206, 89.0003],
  // already in top
};

// 🔹 Component to move map
function ChangeMapView({ coords }) {
  const map = useMap();
  if (coords) {
    map.setView(coords, 10);
  }
  return null;
}

export default function CoveragePage() {
  const [search, setSearch] = useState("");
  const [coords, setCoords] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.trim().toLowerCase();
    if (districts[query]) {
      setCoords(districts[query]);
    } else {
      alert("District not found");
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-10 px-4 bg-slate-100">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 text-center">
        We are available in 64 districts
      </h1>

      {/* Search Box */}
      <form onSubmit={handleSearch} className="w-full max-w-md flex mb-6">
        <input
          type="text"
          placeholder="Search district..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow text-black border rounded-l-lg px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Map */}
      <div className="w-full max-w-5xl h-[500px] border rounded-lg shadow">
        <MapContainer
          center={[23.685, 90.3563]} // Bangladesh center
          zoom={7}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {/* Pan/zoom when search */}
          <ChangeMapView coords={coords} />

          {/* 🔹 Show all district markers */}
          {Object.entries(districts).map(([name, position]) => (
            <Marker key={name} position={position}>
              <Popup>{name.charAt(0).toUpperCase() + name.slice(1)}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
