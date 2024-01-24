import { useState, useEffect } from "react";
import axios from "axios";

import { TPatchNotes } from "../../../types";

import BasicLoadingContainer from "../../../Components/BasicLoadingContainer";
import DashboardPatchNotesHeader from "./DashboardPatchNotesHeader";
import DashboardPatchNotesContent from "./DashboardPatchNotesContent";

export default function DashboardPatchNotes() {
  const [patchNotes, setPatchNotes] = useState<TPatchNotes | null>(null);
  const [showPatchNotes, setShowPatchNotes] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/patchnotes/last", { withCredentials: true })
      .then(({ data }: { data: TPatchNotes }) => setPatchNotes(data));
  }, []);

  if (!patchNotes) {
    return (
      <BasicLoadingContainer
        loadingName="Patch Notizen"
        plural={true}
      />
    );
  }

  return (
    <article className="patch-notes-container">
      <DashboardPatchNotesHeader
        version={patchNotes.version}
        showPatchNotes={showPatchNotes}
        setShowPatchNotes={setShowPatchNotes}
      />
      {showPatchNotes && (
        <DashboardPatchNotesContent changes={patchNotes.changes} />
      )}
    </article>
  );
}
