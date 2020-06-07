import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './FinalDough.css';
import FormulaTab from './FormulaTab';

const FinalDough: React.FC = () => {
  return (
    <FormulaTab title="Final Dough" content={<ExploreContainer name="Final Dough" />} />
  );
};

export default FinalDough;
