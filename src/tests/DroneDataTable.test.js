// src/__tests__/DroneDataTable.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import DroneDataTable from '../components/DroneDataTable';

describe('DroneDataTable Component', () => {
  const mockData = [
    {
      image_id: 'img_001',
      timestamp: '2024-11-10 12:00:00',
      altitude_m: 100,
      battery_level_pct: 80,
      image_tags: ['forest', 'river'],
    },
    {
      image_id: 'img_002',
      timestamp: '2024-11-10 12:05:00',
      altitude_m: 150,
      battery_level_pct: 75,
      image_tags: ['mountain', 'snow'],
    },
  ];

  test('renders table headers correctly', () => {
    render(<DroneDataTable data={[]} />);

    expect(screen.getByText('Image ID')).toBeInTheDocument();
    expect(screen.getByText('Timestamp')).toBeInTheDocument();
    expect(screen.getByText('Altitude (m)')).toBeInTheDocument();
    expect(screen.getByText('Battery Level (%)')).toBeInTheDocument();
    expect(screen.getByText('Tags')).toBeInTheDocument();
  });

  test('renders data rows correctly', () => {
    render(<DroneDataTable data={mockData} />);

    // Check for the first data row
    expect(screen.getByText('img_001')).toBeInTheDocument();
    expect(screen.getByText('2024-11-10 12:00:00')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();
    expect(screen.getByText('forest, river')).toBeInTheDocument();

    // Check for the second data row
    expect(screen.getByText('img_002')).toBeInTheDocument();
    expect(screen.getByText('2024-11-10 12:05:00')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByText('mountain, snow')).toBeInTheDocument();
  });
});
