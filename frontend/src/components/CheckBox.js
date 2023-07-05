export default function CheckBox(props) {
  return (
    <div className="round" onClick={props.onClick} key={props.task.taskName}>
      {!props.checked && (
        <svg
          width="2.5rem"
          height="2.5rem"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            id="Oval Copy"
            cx="12"
            cy="12"
            r="12"
            fill="white"
            stroke="#E3E4F1"
          />
        </svg>
      )}
      {props.checked && (
        <svg
          width="2.5rem"
          height="2.5rem"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Group 4">
            <circle
              id="Oval"
              cx="12"
              cy="12"
              r="11.5"
              fill="white"
              stroke="#E3E4F1"
            />
            <g id="Group 3">
              <circle id="Oval_2" cx="12" cy="12" r="12" fill="#D375B9" />
              <path
                id="Path"
                d="M8 12.3041L10.6959 15L16.6959 9"
                stroke="white"
                strokeWidth="2"
              />
            </g>
          </g>
        </svg>
      )}
    </div>
  );
}
