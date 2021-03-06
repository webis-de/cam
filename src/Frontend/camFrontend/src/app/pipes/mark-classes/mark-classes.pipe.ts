import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { DispensableResult } from '../../model/dispensable-result';

@Pipe({
  name: 'markClasses'
})
export class MarkClassesPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string, result: DispensableResult, finalAspectList: Array<string>,
    filterAspects: Array<string>, trigger: number, isContext: boolean): SafeHtml {
    value = this.replaceByMarking('winner', [result.winner], value);
    value = this.replaceByMarking('looser', [result.looser], value);
    value = this.replaceByMarking('aspect', finalAspectList, value);
    if (!isContext || isContext === undefined) {
      value = this.replaceByMarking('filteredAspect', filterAspects, value);
      value = this.replaceByMarking('link', result.looserLinks, value);
      value = this.replaceByMarking('link', result.winnerLinks, value);
    }


    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

  private replaceByMarking(type: string, toMark: Array<string>, value: string) {
    for (const mark of toMark) {
      value = value.replace(this.buildRegex(mark), match => {
        return `<span class="${type}">${match}</span>`;
      });
    }
    return value;
  }

  private buildRegex(sequence: string) {
    const regex1 = '(?!([^<]+)?>)(?!<span[^>]*?>)(\\b';
    const regex2 = '\\b)(?![^<]*?</span>)';
    const cleanedSequence = sequence.replace(/[^a-zA-Z0-9 ]/g, ' ').replace(/ +/g, ' ');
    sequence = sequence.replace(/ /g, '');
    sequence = sequence.split('').join('([^A-Za-z0-9])*');
    return new RegExp(`${regex1}${sequence}${regex2}|${regex1}${cleanedSequence}${regex2}`, 'gi');
  }

}
