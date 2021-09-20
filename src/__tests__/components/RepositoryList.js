import React from 'react';
import { RepositoryListContainer } from "../../components/RepositoryList";
import { render } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here
      const { debug, getByTestId } = render(<RepositoryListContainer repositories={repositories} />);
      debug();
      repositories.edges.map(n => {
        expect(getByTestId(n.node.id + '_fullName')).toHaveTextContent(n.node.fullName);
        expect(getByTestId(n.node.id + '_description')).toHaveTextContent(n.node.description);
        expect(getByTestId(n.node.id + '_language')).toHaveTextContent(n.node.language);
        expect(getByTestId(n.node.id + '_forksCount')).toHaveTextContent(n.node.forksCount > 1000 ? Math.round(n.node.forksCount / 100) / 10 + 'k' : n.node.forksCount);
        expect(getByTestId(n.node.id + '_stargazersCount')).toHaveTextContent(n.node.stargazersCount > 1000 ? Math.round(n.node.stargazersCount / 100) / 10 + 'k' : n.node.stargazersCount);
        expect(getByTestId(n.node.id + '_ratingAverage')).toHaveTextContent(n.node.ratingAverage);
        expect(getByTestId(n.node.id + '_reviewCount')).toHaveTextContent(n.node.reviewCount > 1000 ? Math.round(n.node.reviewCount / 100) / 10 + 'k' : n.node.reviewCount);
      });
    });
  });
});