import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";

TimeAgo.addDefaultLocale(en);
export default function TimeAdded({ date }) {
  return (
    <>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
    </>
  );
}
