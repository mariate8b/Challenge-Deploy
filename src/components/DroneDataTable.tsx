
interface DroneData {
  image_id: string;
  timestamp: string;
  altitude_m: number;
  battery_level_pct: number;
  image_tags: string[];
}

const DroneDataTable = ({ data } : {data: DroneData[]}) => {
   
  return (
    <div className="drone-data-table grid grid-cols-1 py-5" >
      <table className='table-auto rounded-md'>
        <thead className='bg-slate-100 border border-slate-200'>
          <tr >
            <th>Image ID</th>
            <th>Timestamp</th>
            <th>Altitude (m)</th>
            <th>Battery Level (%)</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr className='hover:bg-slate-200' key={item.image_id}>
              <td>{item.image_id}</td>
              <td>{item.timestamp}</td>
              <td>{item.altitude_m}</td>
              <td>{item.battery_level_pct}</td>
              <td>{item.image_tags.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DroneDataTable;
