import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Overall.css';
import FormulaTab from './FormulaTab';

const Overall: React.FC = () => {
  return (
    <FormulaTab title="Overall" content={<ExploreContainer name="Overall page" />} />
  );
};

export default Overall;
