from abc import ABC, abstractmethod

class ExportsInterface(ABC):
    @abstractmethod
    def export(self):
        pass