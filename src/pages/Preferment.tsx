import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Preferment.css';
import FormulaTab from './FormulaTab';

const Preferment: React.FC = () => {
  return (
    <FormulaTab title="Preferment" content={<ExploreContainer name="Preferment" />} />
  );
};

export default Preferment;
