import firebase from "firebase";

// MajorFooter returns a footer element forthe major pages containing author information, citations for information, and citations for images and icons.
export function MajorFooter(props) {
  let content;
  props.content.forEach((major) => {
    if (major.majorName === props.name) {
      content = major;
    }
  })
  return <footer className="text-center">
  <p>
      Authors: Catherine Lien, Jessie Chen, Jesse Sershon, Jason Jung. Information from <a
          href="https://www.washington.edu/students/gencat/academic/college_environment.html">
          <cite>UW Degree Program</cite>.</a> Favicon from <a
          href="https://www.iconfinder.com/icons/1936907/eco_environment_green_leaves_nature_recycle_recycling_icon">
          <cite>Iconfinder</cite></a>. 
          
          Image of {content.smallAlt} from <a href={content.smallLink}>
            <cite>Unsplash</cite></a>. Image of {content.bigAlt} from <a href={content.bigLink}><cite>Unsplash</cite></a>.
            Cover image from <a href="https://unsplash.com/s/photos/green-leaf"><cite>Unsplash</cite></a>.
  </p>
  <button className="btn btn-warning" onClick={handleSignOut}>
            Log Out
  </button>
</footer>;
}

const handleSignOut = () => {
  firebase.auth().signOut();
}