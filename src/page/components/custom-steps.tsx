import React from 'react';

export interface Step {
  step: number;
  description: any;
}

export default function CustomSteps({
  steps,
  currentStep,
  moveStep,
}: {
  steps: Step[];
  currentStep: any;
  moveStep?: (step: number) => void;
}) {
  return (
    <div className='steps-container'>
      {steps.map((step, i) => (
        <>
          <div
            key={i}
            className={'step ' + (step.step <= currentStep ? ' active' : '')}
            onClick={() => {
              if (step.step <= currentStep) {
                moveStep?.(step.step);
              }
            }}>
            <div className='key'>{step.step}</div>
            <div className='description'>{step.description}</div>
          </div>
          {i < steps.length - 1 ? (
            <div
              className={
                'space ' + (step.step <= currentStep ? ' active-space' : '')
              }></div>
          ) : (
            <></>
          )}
        </>
      ))}
    </div>
  );
}
