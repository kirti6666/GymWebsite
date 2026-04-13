function CardGrid({ title, items, renderItem }) {
  return (
    <section className="section">
      <div className="container">
        <h3>{title}</h3>
        <div className="grid">
          {items.map((item) => (
            <article key={item._id || item.id} className="card">
              {renderItem(item)}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CardGrid;
