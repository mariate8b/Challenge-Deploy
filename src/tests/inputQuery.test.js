// src/__tests__/QueryInput.test.js
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import QueryInput from '../components/QueryInput';

describe('QueryInput Component', () => {
  beforeEach(() => {
    // Reset fetch before each test
    global.fetch = jest.fn();
    // Optionally mock console.error to suppress error logs during tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders textarea and submit button', () => {
    render(<QueryInput />);
    expect(screen.getByPlaceholderText(/ask a question/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('submit button is disabled when textarea is empty', () => {
    render(<QueryInput />);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  test('submit button is enabled when textarea has input', () => {
    render(<QueryInput />);
    const textarea = screen.getByPlaceholderText(/ask a question/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(textarea, { target: { value: 'What is the weather today?' } });
    expect(submitButton).toBeEnabled();
  });

  test('fetch is called with correct parameters on form submit', async () => {
    const mockResponse = { response: 'It is sunny today.' };
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    render(<QueryInput />);
    const textarea = screen.getByPlaceholderText(/ask a question/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(textarea, { target: { value: 'What is the weather today?' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:5001/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: 'What is the weather today?' }),
    });
  });

  test('displays response after successful fetch', async () => {
    const mockResponse = { response: 'It is sunny today.' };
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    render(<QueryInput />);
    const textarea = screen.getByPlaceholderText(/ask a question/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(textarea, { target: { value: 'What is the weather today?' } });
    fireEvent.click(submitButton);

    const responseElement = await screen.findByText(/it is sunny today\./i);
    expect(responseElement).toBeInTheDocument();
  });

  test('handles fetch errors gracefully', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));

    render(<QueryInput />);
    const textarea = screen.getByPlaceholderText(/ask a question/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(textarea, { target: { value: 'Will this cause an error?' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Optionally, check if console.error was called
    expect(console.error).toHaveBeenCalledWith('Error fetching data: ', expect.any(Error));
  });
});
