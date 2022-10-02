import  ProgressBar from "../src/components/semtex/Progress"
//import { useRouter } from "next/router";
import MyApp from "../src/pages/_app";
import {render, screen} from '@testing-library/react'
import React, { useContext, useEffect, useState } from "react";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { useRouter } from "next/router";
import Link from "../src/components/ui/Link"
import SignIn from "../src/components/auth/SignIn"
//const useRouter = jest.spyOn(require('next/router'), 'useRouter')
//useRouter.mockImplementation(() => {
//  return {
//    query:{
//
//    }
//  }
//});


test('contain button console', async () => {
  // ARRANGE
  render(
    <SignIn/>
  )

  const linkElement = screen.getByRole('Button');
  expect(screen.getByRole('Button').textContent).toBe('Previous');
  //expect(screen.getByRole('link')).toHaveAttribute('value', '/www.google.com')

})
