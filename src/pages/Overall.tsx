import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Overall.css';
import FormulaTab from './FormulaTab';

interface Props {
  recipe: string;
}

const Overall: React.FC<Props> = ({ recipe }) => {
  return (
    <FormulaTab title={recipe} content={<ExploreContainer name="Overall page" />} />
  );
};

export default Overall;
