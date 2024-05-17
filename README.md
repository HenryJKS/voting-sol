## Analysis Case
The contract `Voting` create a case for voting, where each person can vote one time, choosing between `Accept` and `Deny`.

The contract `FactoryVoting` storage a list of address `Voting` can be access for all and to follow.

## Business Rules
- Rules: if the number of approving votes is half or more of all the votes, the case will be approved.
- Each voting will be only one case.