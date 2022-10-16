import  ProgressBar from "../src/components/semtex/Progress"
import MyApp from "../src/pages/_app";
import {render, screen} from '@testing-library/react'
import React, { useContext, useEffect, useState } from "react";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { useRouter } from "next/router";
import Link from "../src/components/ui/Link"
import SignIn from "../src/components/auth/SignIn"


test('contain button console', async () => {
  render(
    <SignIn/>
  )

  const linkElement = screen.getByRole('Button');
  expect(screen.getByRole('Button').textContent).toBe('Previous');

})
