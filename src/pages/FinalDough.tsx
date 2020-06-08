import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './FinalDough.css';
import FormulaTab from './FormulaTab';

interface Props {
  recipe: string;
}

const FinalDough: React.FC<Props> = ({recipe}) => {
  return (
    <FormulaTab title={recipe} content={<ExploreContainer name="Final Dough" />} />
  );
};

export default FinalDough;
