/**
 * PositionDetails
 *
 * Page for the list of candidates for position.
 */
import React, { useCallback, useState } from "react";
import PT from "prop-types";
import LayoutContainer from "components/LayoutContainer";
import LoadingIndicator from "components/LoadingIndicator";
import PageHeader from "components/PageHeader";
import { CANDIDATE_STATUS } from "constants";
import { useData } from "hooks/useData";
import { getPositionDetails } from "services/teams";
import PositionCandidates from "./PositionCandidates";
import "./styles.module.scss";
import CandidatesStatusFilter from "./CandidatesStatusFilter";

const PositionDetails = ({ teamId, positionId }) => {
  const [candidateStatus, setCandidateStatus] = useState(CANDIDATE_STATUS.OPEN);
  const [position, loadingError] = useData(
    getPositionDetails,
    teamId,
    positionId
  );

  const onCandidateStatusChange = useCallback(
    (status) => {
      setCandidateStatus(status);
    },
    [setCandidateStatus]
  );

  return (
    <LayoutContainer>
      {!position ? (
        <LoadingIndicator error={loadingError && loadingError.toString()} />
      ) : (
        <>
          <PageHeader
            title={position.description}
            backTo={`/taas/myteams/${teamId}`}
            aside={
              <CandidatesStatusFilter
                onChange={onCandidateStatusChange}
                currentStatus={candidateStatus}
                candidates={position.candidates}
              />
            }
          />
          <PositionCandidates
            candidates={position.candidates}
            candidateStatus={candidateStatus}
            positionSkills={position.skills}
          />
        </>
      )}
    </LayoutContainer>
  );
};

PositionDetails.propTypes = {
  teamId: PT.string,
  positionId: PT.string,
};

export default PositionDetails;
