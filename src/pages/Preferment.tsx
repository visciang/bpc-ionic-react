import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Preferment.css';
import FormulaTab from './FormulaTab';

interface Props {
  recipe: string;
}

const Preferment: React.FC<Props> = ({recipe}) => {
  return (
    <FormulaTab title={recipe} content={<ExploreContainer name="Preferment" />} />
  );
};

export default Preferment;
