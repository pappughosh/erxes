import MainActionBar from 'modules/boards/components/MainActionBar';
import { ButtonGroup } from 'modules/boards/styles/header';
import { IBoard, IPipeline } from 'modules/boards/types';
import Icon from 'modules/common/components/Icon';
import Tip from 'modules/common/components/Tip';
import { __ } from 'modules/common/utils';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  onSearch: (search: string) => void;
  onSelect: (values: string[] | string, name: string) => void;
  onDateFilterSelect: (name: string, value: string) => void;
  onClear: (name: string, values) => void;
  isFiltered: () => boolean;
  clearFilter: () => void;
  currentBoard?: IBoard;
  currentPipeline?: IPipeline;
  boards: IBoard[];
  middleContent?: () => React.ReactNode;
  history: any;
  queryParams: any;
  assignedUserIds?: string[];
  type: string;
};

const GrowthHackMainActionBar = (props: Props) => {
  // get selected type from URL
  const viewType = window.location.href.includes('board')
    ? 'board'
    : 'priorityMatrix';

  const viewChooser = () => {
    const onFilterClick = (type: string) => {
      const { currentBoard, currentPipeline } = props;

      if (currentBoard && currentPipeline) {
        return `/growthHack/${type}?id=${currentBoard._id}&pipelineId=${
          currentPipeline._id
        }`;
      }

      return `/growthHack/${type}`;
    };

    const boardLink = onFilterClick('board');
    const priorityMatrixLink = onFilterClick('priorityMatrix');

    return (
      <ButtonGroup>
        <Tip text={__('Board')} placement="bottom">
          <Link to={boardLink} className={viewType === 'board' ? 'active' : ''}>
            <Icon icon="window-section" />
          </Link>
        </Tip>
        <Tip text={__('Priority matrix')} placement="bottom">
          <Link
            to={priorityMatrixLink}
            className={viewType === 'priorityMatrix' ? 'active' : ''}
          >
            <Icon icon="arrows-up-right" />
          </Link>
        </Tip>
      </ButtonGroup>
    );
  };

  const extendedProps = {
    ...props,
    link: `/growthHack/${viewType}`,
    rightContent: viewChooser
  };

  return <MainActionBar {...extendedProps} />;
};

export default GrowthHackMainActionBar;
