import QueryInput from './components/QueryInput';
import DroneDataTable from './components/DroneDataTable';
import droneData from './droneData.json';

  function App() {
    
  
    return (
      <div className="App container mx-auto px-5 py-5 bg-slate-50 text-center">
        <div className='text-center'>
          <h1>Drone Data Interface</h1>
        </div>
        <QueryInput  />
        <DroneDataTable data={droneData} />
      </div>
    );
  }
  
  export default App;
