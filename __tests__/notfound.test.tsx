import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import NotFound from '../src/toynotFound';
let documentBody: RenderResult;
describe('<NotFound />', () => {
  beforeEach(() => {
    documentBody = render(<NotFound />);
  });
  it('shows not found message', () => {
    expect(documentBody.getByText('Not Found')).toBeInTheDocument();
    expect(documentBody.getByText('404')).toBeInTheDocument();
  });
});