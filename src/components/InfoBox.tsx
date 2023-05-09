/**
 * An InfoBox is a pairing of an icon and some short content on the homepage to
 * describe how CaDance workss
 */

/**
 * The interface for the props of the InfoBox component.
 * @property {string} imgsrc The source link of the image to display
 * @property {string} imgalt The alt text of the image to display
 * @property {string} content The content to display
 */
interface InfoBoxProps {
  imgsrc: string;
  imgalt?: string;
  content: string;
}

/**
 * A component that displays an icon and some content.
 * @param {InfoBoxProps} props The props for the InfoBox.
 * @returns {JSX.Element} An InfoBox component.
 */
export function InfoBox(props: InfoBoxProps): JSX.Element {
  return (
    <div className="info-box">
      <div className="info-box-icon">
        <img src={props.imgsrc} alt={props.imgalt ? props.imgalt : ""} />
      </div>
      <p className="info-box-content">{props.content}</p>
    </div>
  );
}
