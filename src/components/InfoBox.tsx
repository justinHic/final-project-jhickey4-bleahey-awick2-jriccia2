/**
 * An InfoBox is a pairing of an icon and some short content on the homepage to
 * describe how CaDance workss
 */

interface InfoBoxProps {
  imgsrc: string;
  imgalt?: string;
  content: string;
}

export function InfoBox(props: InfoBoxProps) {
  return (
    <div className="info-box">
      <div className="info-box-icon">
        <img src={props.imgsrc} alt={props.imgalt ? props.imgalt : ""} />
      </div>
      <p className="info-box-content">{props.content}</p>
    </div>
  );
}
