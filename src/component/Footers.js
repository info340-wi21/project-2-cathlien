import firebase from "firebase";
import { Button } from 'reactstrap';

// Returns a footer component containing author information, and citations for images and icons.
export function Footer() {
  return <footer className="text-center">
  <p>
      Authors: Catherine Lien, Jessie Chen, Jesse Sershon, Jason Jung. Information from <a
          href="https://www.washington.edu/students/gencat/academic/college_environment.html">
          <cite>UW Degree Program</cite>.</a> Favicon from <a
          href="https://www.iconfinder.com/icons/1936907/eco_environment_green_leaves_nature_recycle_recycling_icon">
          <cite>Iconfinder</cite></a>. Cover image from <a
          href="https://unsplash.com/s/photos/green-leaf"><cite>Unsplash</cite></a>.
  </p>
  <Button color="warning" onClick={handleSignOut}>Log Out</Button>
</footer>;
}

const handleSignOut = () => {
  firebase.auth().signOut();
}
