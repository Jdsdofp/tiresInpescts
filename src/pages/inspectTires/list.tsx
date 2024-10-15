import React, { useState } from 'react';
import { Modal, InputNumber, Input, Space, Select } from 'antd';
import tireImage from '../../../public/pneus.png'; // Substitua pelo caminho da imagem dos pneus

const { Option } = Select;

export const InspectTires = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTire, setSelectedTire] = useState(null);
  const [vehicleType, setVehicleType] = useState('truck');

  const tireConfigurations = {
    truck: {
      frontAxle: ['Pneu Dianteiro Esquerdo', 'Pneu Dianteiro Direito'],
      middleAxle: [
        'Pneu Intermediário Esquerdo Interno',
        'Pneu Intermediário Esquerdo Externo',
        'Pneu Intermediário Direito Interno',
        'Pneu Intermediário Direito Externo',
      ],
      rearAxle: [
        'Pneu Traseiro Esquerdo Interno',
        'Pneu Traseiro Esquerdo Externo',
        'Pneu Traseiro Direito Interno',
        'Pneu Traseiro Direito Externo',
      ],
    },
    toco: {
      frontAxle: ['Pneu Dianteiro Esquerdo', 'Pneu Dianteiro Direito'],
      rearAxle: ['Pneu Traseiro Esquerdo', 'Pneu Traseiro Direito'],
    },
    carretaDoisEixos: {
      frontAxle: ['Pneu Dianteiro Esquerdo', 'Pneu Dianteiro Direito'],
      rearAxle: [
        'Pneu Traseiro Esquerdo Interno',
        'Pneu Traseiro Esquerdo Externo',
        'Pneu Traseiro Direito Interno',
        'Pneu Traseiro Direito Externo',
      ],
    },
    carretaTresEixos: {
      
      middleAxle: [
        'Pneu Intermediário Esquerdo Interno',
        'Pneu Intermediário Esquerdo Externo',
        'Pneu Intermediário Direito Interno',
        'Pneu Intermediário Direito Externo',
      ],
      rearAxle: [
        'Pneu Traseiro Esquerdo Interno',
        'Pneu Traseiro Esquerdo Externo',
        'Pneu Traseiro Direito Interno',
        'Pneu Traseiro Direito Externo',
      ],
    },
  };

  const showModal = (tire) => {
    setSelectedTire(tire);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedTire(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTire(null);
  };

  const handleVehicleTypeChange = (value) => {
    setVehicleType(value);
  };

  const renderAxle = (axle, axleName) => (
    <div key={axleName} style={{ marginBottom: '20px' }}>
      <h3>{axleName}</h3>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        {axle.map((tire, index) => (
          <img
            key={tire}
            src={tireImage}
            alt={tire}
            style={{
              width: '80px',
              cursor: 'pointer',
              marginLeft: index === 2 ? '40px' : '0', // Ajuste para espaçar pares de pneus
            }}
            onClick={() => showModal(tire)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Inspeção de Pneus</h2>
      <Select
        defaultValue={vehicleType}
        style={{ width: 200, marginBottom: '20px' }}
        onChange={handleVehicleTypeChange}
      >
        <Option value="truck">Truck</Option>
        <Option value="toco">Toco</Option>
        <Option value="carretaDoisEixos">Carreta 2 Eixos</Option>
        <Option value="carretaTresEixos">Carreta 3 Eixos</Option>
      </Select>

      {Object.entries(tireConfigurations[vehicleType]).map(([axleName, axle]) =>
        renderAxle(axle, axleName)
      )}

      <Modal
        title={`Inspeção de ${selectedTire}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <label>Profundidade do Sulco (mm):</label>
          <InputNumber placeholder="Insira a profundidade" min={0} max={20} style={{ width: '100%' }} />

          <label>Pressão do Pneu (psi):</label>
          <InputNumber placeholder="Insira a pressão" min={0} max={150} style={{ width: '100%' }} />

          <label>Observações:</label>
          <Input.TextArea placeholder="Observações adicionais" rows={2} style={{ width: '100%' }} />
        </Space>
      </Modal>
    </div>
  );
};
