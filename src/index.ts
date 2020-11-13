/* eslint-disable */
// import "./sdToSeqD";
import checkSD from './validateSd';
import { SQSD } from '../definitions/defs';
import parseSD from './parseSD';
import generateTS from './codeGen';
// import generateSD from "./generateSD";
import generateSeqD from './generateSeqD';
import * as ts from 'typescript';

const SDCHECK = false;

export function getMashupLogic(
  sd: SQSD.sdTemplate,
  systemName: string
): SQSD.mashupLogic {
  const outTDs: SQSD.subthing[] = [];
  Object.keys(sd.things).forEach((name) => {
    outTDs.push(sd.things[name]);
  });

  try {
    const mashupLogic = parseSD(sd);
    const message = `[core/getMashupLogic] Generated MashupLogic for system with name ${systemName}`;
    console.log(message);
    return mashupLogic;
  } catch (error) {
    const message = `[core/getMashupLogic] Error generating MashupLogic for system with name ${systemName}. ${error}`;
    console.error(message);
    throw new Error(message);
  }
}

export function getSeqD(
  mashupLogic: SQSD.mashupLogic,
  systemName: string
): string {
  try {
    const seqD = generateSeqD(mashupLogic);
    const message = `[core/getSeqD] Generated SeqD for system with name ${systemName}`;
    console.log(message);
    return seqD;
  } catch (error) {
    const message = `[core/getSeqD] Error generating SeqD for system with name ${systemName}. ${error}`;
    console.error(message);
    throw new Error(message);
  }
}

export async function getCode(
  sd: SQSD.sdTemplate,
  mashupLogic: SQSD.mashupLogic,
  systemName: string,
  outFileName = 'codeTS'
): Promise<{ codeTS: string; baseTS: string }> {
  const sdValid = SDCHECK ? await checkSD(JSON.stringify(sd)) : true;

  if (sdValid) {
    try {
      const { codeTS, baseTS }: any = generateTS(sd, mashupLogic, outFileName);
      const message = `[core/getCode] Generated codeTS for system with name ${systemName}`;
      console.log(message);
      return { codeTS, baseTS };
    } catch (error) {
      const message = `[core/getCode] Error generating codeTS for system with name ${systemName}. ${error}`;
      console.error(message);
      throw new Error(message);
    }
  } else {
    const message = `[core/getCode] Invalid input SD for system with name ${systemName}`;
    console.error(message);
    throw new Error(message);
  }
}

type moduleType = 'ESNext' | 'CommonJS' | 'AMD' | 'ES5';

/**
 * Transpiles a TypeScript string (with ES module import/export syntax by default)
 * to its valid JavaScript string representation using the native ts.transpileModule method
 *
 * @see https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#a-simple-transform-function
 *
 * @param codeTS the typescript code to be transpiled
 * @returns a javascript string of the transpiled code
 */
export function transpileTStoJS(
  codeTS: string,
  moduleType: moduleType = 'CommonJS' // worker_threads require CommonJS
): string {
  const { outputText: codeJS, diagnostics } = ts.transpileModule(codeTS, {
    compilerOptions: { module: ts.ModuleKind[moduleType] },
  });

  return codeJS;
}
