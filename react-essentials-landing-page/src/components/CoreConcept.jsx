const CoreConcept = ({image, desc, title="React" }) => {
  return (
    <li>
      <img src= {image} alt={title}/>
      <h3>{title}</h3>
      <p>{desc}</p>
    </li>
  );
};

export default CoreConcept;