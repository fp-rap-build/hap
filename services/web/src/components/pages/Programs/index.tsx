import React, { useState, useEffect } from 'react';
import { message } from 'antd';

import { useParams } from 'react-router-dom';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import LoadingComponent from '../../common/LoadingComponent';

import Program from './components/Program';
import Actions from './components/Actions';
import Modals from './components/Modals';

import styles from '../../../styles/pages/programs.module.css';
import Modal from 'antd/lib/modal/Modal';

export default function Index() {
  const params = useParams();

  const [programs, setPrograms] = useState([]);
  const [currentProgram, setCurrentProgram] = useState({
    name: '',
    budget: null,
  });

  const [loading, setLoading] = useState(false);

  const [isEditProgramModalVisible, setIsEditProgramModalVisible] = useState(
    false
  );

  const [isProgramModalVisible, setIsProgramModalVisible] = useState(false);

  const openAddProgramModal = () => setIsProgramModalVisible(true);
  const openEditProgramModal = () => setIsEditProgramModalVisible(true);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const res = await axiosWithAuth().get(`/orgs/${params.id}/programs`);

      setPrograms(res.data.programs);
    } catch (error) {
      message.error('Unable to fetch programs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  const ModalProps = {
    programs,
    setPrograms,
    currentProgram,
    isProgramModalVisible,
    setIsProgramModalVisible,
    isEditProgramModalVisible,
    setIsEditProgramModalVisible,
  };

  return (
    <div className={styles.container}>
      <Actions openAddProgramModal={openAddProgramModal} />
      <RenderPrograms
        setCurrentProgram={setCurrentProgram}
        programs={programs}
        openEditProgramModal={openEditProgramModal}
      />
      <Modals props={ModalProps} />
    </div>
  );
}

const RenderPrograms = ({
  programs,
  setCurrentProgram,
  openEditProgramModal,
}) => {
  return (
    <div className={styles.programs}>
      {programs.map(program => (
        <Program
          program={program}
          setCurrentProgram={setCurrentProgram}
          openEditProgramModal={openEditProgramModal}
        />
      ))}
    </div>
  );
};
