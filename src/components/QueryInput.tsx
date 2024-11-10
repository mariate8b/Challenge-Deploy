
  import { FormEvent, useState } from 'react';
  import QueryResponse from './QueryResponse';

  const QueryInput = () => {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");

    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const res = await fetch('http://localhost:5001/api/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });
        const data = await res.json();
        setResponse(data.response);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setResponse("Error fetching data: Please check console for more details");
      }
    };

    return (
      <div className="query-input py-3">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1">
            <div>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a question..."
                className='p-3 w-1/2 border border-solid border-slate-300 rounded-md bg-inherit'
              >
              </textarea>
            </div>
            <div className='my-3'>
              <button 
                type="submit"
                className='p-3 border border-solid border-slate-300 hover:bg-slate-200 active:bg-slate-100 focus:bg-slate-100 cursor-pointer rounded-md text-black required:border-red-500 shadow-lg hover:transition-all' 
                disabled={!query.trim()}
              >
                Submit
              </button>
            </div>
            
          </div>
        </form>
        <code>
          {response && <QueryResponse response={response} />}

        </code>
      </div>
    );
  };

  export default QueryInput;


