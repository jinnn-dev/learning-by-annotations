import { ClassicPreset } from 'rete';
import { ISerializable, Serializable } from '../serializable';

export abstract class Control<S extends ISerializable>
  extends ClassicPreset.Control
  implements Serializable<S extends ISerializable ? any : any>
{
  public abstract serialize(key?: string | undefined): S extends ISerializable ? any : any;
}
