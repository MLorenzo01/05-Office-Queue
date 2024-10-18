TEMPLATE FOR RETROSPECTIVE (Team ##)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done: 4 committed stories and 3 done stories
- Total points committed vs. done: 13 point committed and 5 point done
- Nr of hours planned vs. spent (as a team): 69.5 hours planned and   63.5 hours spent

**Remember** a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing: 0 (not done)
- Code review completed: 3 (one for each US completed)
- Code present on VCS:
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!) 

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |  _14_       |   __    |    _1w30m_        |      _1w2d30m_        |
| _#1_   |  _3_       |   _3_    |    _5h_        |      _5h30m_        |
| _#2_     | _5_        |   _2_     |    _1d1h_        |    _1d2h_          |
| _#3_     |   _3_      |    _1_    |     _7h_       |      _7h30m_        |
| _#4_     |   _4_      |   _8_     |     _6h_       |      _0_        |
   

> story `#0` is for technical tasks, leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)
  ESTIMATE: 15,16  ACTUAL: 16,84
- Total estimation error ratio: sum of total hours spent / sum of total hours effort - 1

    $$\frac{\sum_i spent_{task_i}}{\sum_i estimation_{task_i}} - 1$$
    VALUE: 0,178 or 18%
    
- Absolute relative task estimation error: sum( abs( spent-task-i / estimation-task-i - 1))/n

    $$\frac{1}{n}\sum_i^n \left| \frac{spent_{task_i}}{estimation_task_i}-1 \right| $$
    VALUE: 27.5%
  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated
  - Total hours spent
  - Nr of automated unit test cases
  - Coverage (if available)
- E2E testing:
  - Total hours estimated: 6h
  - Total hours spent: 6h
- Code review
  - Total hours estimated: 4h
  - Total hours spent: 3h30m
  
## ASSESSMENT

- What caused your errors in estimation (if any)?
Not enough experience on this type of work organization, and at the beginning we don't know the skills of each other.

- What lessons did you learn (both positive and negative) in this sprint?
The specification of the API (and code in general) need to be more precise and not have lack of information between the persons.

- Which improvement goals set in the previous retrospective were you able to achieve?
(first retrospective)
  
- Which ones you were not able to achieve? Why?
(first retrospective)

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  - Specification of the API: need to describe the format of the API and of the relative response (save this in a .MD file);
  - Specification of the needed: the person who need some API or function have to explain weel the specification;
  - More comunication: if possible increase the number of scrum meetings.

- One thing you are proud of as a Team
 For the first time the coordination between each other was well and for beem only 4 person the work goes well.