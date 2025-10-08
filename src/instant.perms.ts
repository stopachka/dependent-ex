// Docs: https://www.instantdb.com/docs/permissions

import type { InstantRules } from '@instantdb/react';

const rules = {
  $default: {
    allow: {
      $default: "false",
      view: "true",
    },
  },
} satisfies InstantRules;

export default rules;
