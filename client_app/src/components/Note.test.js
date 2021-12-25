import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Note from "./Note";

// TODO: update this in fso's repo. this needs to follow the best practices of the RTL.

test('renders content', () => {
  const note = {
    content: 'Component testing is done with RTL',
    important: true,
  }

  const component = render(
    <Note note={note} />
  )
  
  // method #1
  expect(component.container).toHaveTextContent('Component testing is done with RTL');

  // method #2
  const element = component.getByText('Component testing is done with RTL');
  expect(element).toBeDefined();

  // method #3
  const div = component.container.querySelector('.note');
  expect(div).toHaveTextContent('Component testing is done with RTL');
});

test('clicking the button calls event handler once', () => {
  const note = {
    content: 'Component testing is done with RTL',
    important: true,
  }

  const mockHandler = jest.fn();

  const component = render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const button = component.getByText('make not important');
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});

