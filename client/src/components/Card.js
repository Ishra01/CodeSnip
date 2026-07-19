function Card({ title, language, code, id, onDelete, onEdit }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{language}</p>
      <div className="card-buttons">
        <button onClick={() => navigator.clipboard.writeText(code)}>Copy</button>
        <button onClick={onEdit}>Edit</button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
}

export default Card;