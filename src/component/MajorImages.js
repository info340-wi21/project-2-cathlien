// Returns images for major cards and pages.
export function MajorImages(props) {
  let content;
  props.content.forEach((major) => {
    if (major.majorName === props.name) {
      content = major;
    }
  })
  return <div><img className="major-img small-img" src={content.smallImg} alt={content.smallAlt}/>
  <img className="major-img big-img" src={content.bigImg} alt={content.bigAlt} /></div>;
}