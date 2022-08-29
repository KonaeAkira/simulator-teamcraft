import { Simulation } from '../../../simulation/simulation';
import { ActionType } from '../action-type';
import { CraftingJob } from '../../crafting-job.enum';
import { ProgressAction } from '../progress-action';
import { Buff } from '../../buff.enum';
import { StepState } from '../../step-state';

/**
 * MuMe is just piece by piece with a different condition, cost and success rate.
 */
export class MuscleMemory extends ProgressAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 54 };
  }

  public getType(): ActionType {
    return ActionType.PROGRESSION;
  }

  execute(simulation: Simulation): void {
    super.execute(simulation);
    simulation.buffs.push({
      duration: simulation.state === StepState.PRIMED ? 7 : 5,
      stacks: 0,
      buff: Buff.MUSCLE_MEMORY,
      appliedStep: simulation.steps.length,
    });
  }

  _canBeUsed(simulation: Simulation): boolean {
    return simulation.steps.filter((step) => !step.action.skipsBuffTicks()).length === 0;
  }

  canBeMoved(currentIndex: number): boolean {
    return currentIndex > 0;
  }

  getBaseCPCost(simulation: Simulation): number {
    return 6;
  }

  getIds(): number[] {
    return [100379, 100380, 100381, 100382, 100383, 100384, 100385, 100386];
  }

  getDurabilityCost(simulationState: Simulation): number {
    return 10;
  }

  _getSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 10;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  getPotency(simulation: Simulation): number {
    return 300;
  }
}
