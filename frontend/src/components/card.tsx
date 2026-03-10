type props = {
  className: string;
  description: string;
  title: string;
};
const card = ({ className, description, title }: props) => {
  return (
    <article className="card" style={{ textAlign: "left" }}>
      <header>
        <i className={className}></i>
        <h3>{title}</h3>
      </header>
      <footer className="hstack">
        <p>{description}</p>
      </footer>
    </article>
  );
};

export default card;
