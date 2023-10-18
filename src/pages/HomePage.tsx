import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function HomePage() {
  return (
    <div className="page">
      <h1>Home page</h1>
      <p className="intro">
        Welcome on the Technical Assignment of Mark Reijgwart.
      </p>
      <h2>Frontend</h2>
      <ul>
        <li><FontAwesomeIcon icon={faCheck} /> Used TypeScript and React.js</li>
        <li><FontAwesomeIcon icon={faCheck} /> Style & Responsiveness: Let’s see it match the style of Rebels</li>
        <li><FontAwesomeIcon icon={faCheck} /> Product Overview: Present a list of all digital products with a search bar to quickly find favorites!</li>
        <li><FontAwesomeIcon icon={faCheck} /> Product Details: A detailed view of each product is a must-have!</li>
        <li><FontAwesomeIcon icon={faCheck} /> Wishlists: Create, delete, and manage them seamlessly!</li>
        <li><FontAwesomeIcon icon={faCheck} /> Adding & Removing Products: Literally when changing the heart.</li>
      </ul>
      <h2>Backend</h2>
      <ul>
        <li><FontAwesomeIcon icon={faCheck} /> JSON Server used</li>
        <li><FontAwesomeIcon icon={faCheck} /> JSON File: used the db.json</li>
      </ul>
      <h2>Quality Assurance</h2>
      <ul>
        <li><FontAwesomeIcon icon={faCheck} /> I did some testing myself to ensure the frontend is solid!</li>
        <li><FontAwesomeIcon icon={faCheck} /> Documentation: Clear, concise, and where it’s needed.</li>
        <li><FontAwesomeIcon icon={faXmark} /> Bonus: Earn extra star points for e2e tests!</li>
      </ul>
    </div>
  );
}

export default HomePage;
