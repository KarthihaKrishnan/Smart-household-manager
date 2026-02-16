function FamilyHeader() {
  return (
    <section className="familyheader-container">
      <div className="familyheader-greeting">
        <h1>Karthiha Krishnan</h1>
        <p>{new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric'
        })}th</p>
      </div>
    </section>
  );
}

export default FamilyHeader;