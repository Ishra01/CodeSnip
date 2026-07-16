function Card(props) {
  return (
    <div className="card">
      <h3>{props.title}</h3>
      <p>{props.language}</p>
      <div className="card-buttons">
        <button>Copy</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default Card;