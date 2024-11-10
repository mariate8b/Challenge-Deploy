
const QueryResponse = ({ response } : { response: string }) => {
  return (
    <div className="query-response">
      <p><strong>Response:</strong> {response}</p>
    </div>
  );
};

export default QueryResponse;
