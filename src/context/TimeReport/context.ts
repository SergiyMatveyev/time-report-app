import { createContext } from 'react';
import { ITimeReportContext } from './types';

export const TimeReportContext = createContext<ITimeReportContext | null>(null);
