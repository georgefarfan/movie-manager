export enum FilterType {
  PLOT = 'plot',
  YEAR = 'y',
  TITLE = 't',
  SEARCH = 's',
  MOVIE_TYPE = 'type',
  ID = 'i',
}

export enum FilterKey {
  Title = 'Title',
  Year = 'Year',
  imdbID = 'imdbID',
  Type = 'Type',
  Poster = 'Poster',
  favorite = 'favorite',
  description = 'description',
  rating = 'rating',
}

export enum InputType {
  input = 'input',
  select = 'select',
}
export interface SelectOption {
  value: string;
  label: string;
}

export interface Filter {
  type: string;
  label: string;
  key: FilterType;
  inputType: InputType;
  keyTranslate: {
    label: string;
    placeholder: string;
  };
  options?: SelectOption[];
  filterKey: FilterKey;
}

export const FilterMode = {
  ID: {
    type: 'string',
    label: 'id',
    key: FilterType.ID,
    inputType: InputType.input,
    filterKey: FilterKey.imdbID,
    keyTranslate: {
      label: 'SEARCH.BY_ID.LABEL',
      placeholder: 'SEARCH.BY_ID.PLACEHOLDER',
    },
  } as Filter,
  TITLE: {
    type: 'string',
    label: 'title',
    key: FilterType.SEARCH,
    inputType: InputType.input,
    filterKey: FilterKey.Title,
    keyTranslate: {
      label: 'SEARCH.TITLE.LABEL',
      placeholder: 'SEARCH.TITLE.PLACEHOLDER',
    },
  } as Filter,
  YEAR: {
    type: 'string',
    label: 'year',
    key: FilterType.YEAR,
    inputType: InputType.input,
    filterKey: FilterKey.Year,
    keyTranslate: {
      label: 'SEARCH.YEAR.LABEL',
      placeholder: 'SEARCH.YEAR.PLACEHOLDER',
    },
  } as Filter,
  PLOT: {
    type: 'string',
    label: 'plot',
    inputType: InputType.select,
    key: FilterType.PLOT,
    options: [
      { value: 'full', label: 'Full' },
      { value: 'short', label: 'Short' },
    ],
    keyTranslate: {
      label: 'SEARCH.PLOT.LABEL',
      placeholder: 'SEARCH.PLOT.PLACEHOLDER',
    },
  } as Filter,
  MOVIE_TYPE: {
    type: 'string',
    label: 'type',
    inputType: InputType.select,
    key: FilterType.MOVIE_TYPE,
    filterKey: FilterKey.Type,
    options: [
      { value: 'movie', label: 'Movie' },
      { value: 'serie', label: 'Serie' },
      { value: 'episode', label: 'Episode' },
    ],
    keyTranslate: {
      label: 'SEARCH.MOVIE_TYPE.LABEL',
      placeholder: 'SEARCH.MOVIE_TYPE.PLACEHOLDER',
    },
  } as Filter,
};
