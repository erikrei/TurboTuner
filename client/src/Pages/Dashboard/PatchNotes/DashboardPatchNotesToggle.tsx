import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

type DashboardPatchNotesToggleProps = {
  showPatchNotes: boolean;
  setShowPatchNotes: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DashboardPatchNotesToggle({
  showPatchNotes,
  setShowPatchNotes,
}: DashboardPatchNotesToggleProps) {
  return (
    <span onClick={() => setShowPatchNotes(!showPatchNotes)}>
      {showPatchNotes ? "Zuklappen" : "Aufklappen"}
      {showPatchNotes ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
    </span>
  );
}
