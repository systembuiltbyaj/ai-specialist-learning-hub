// The cold-open that plays when the app is opened.
//
// Deliberately zero JavaScript: the whole sequence is CSS animations with
// `forwards` fill, so it always ends — a hydration failure can't strand a
// visitor behind a black screen, and it costs nothing on a client bundle.
// It lives in the root layout, which only remounts on a full page load, so
// in-app link navigation never replays it.
//
// Timing knobs live on `.intro` in globals.css, along with the note on how the
// name manages to re-centre itself while typing.
const NAME = "Allen Bactad";

export default function IntroOverlay() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-stage">
        <span className="intro-ring intro-ring-1" />
        <span className="intro-ring intro-ring-2" />
        <span className="intro-ring intro-ring-3" />
        <span className="intro-scan" />

        <p className="intro-kicker">System Build</p>

        <span className="intro-name">
          {/* Hidden copy sizes the cell to the finished name; the visible copy
              is clipped inside it and grows out from the centre. */}
          <span className="intro-name-ghost">{NAME}</span>
          <span
            className="intro-name-type"
            style={{ "--intro-chars": NAME.length } as React.CSSProperties}
          >
            <span className="intro-name-inner">{NAME}</span>
            <span className="intro-caret" />
          </span>
        </span>
      </div>
    </div>
  );
}
