from scipy.spatial import distance as dist
from collections import OrderedDict
import numpy as np

class CentroidTracker:
    def __init__(self, maxDisappeared=50, maxDistance=50):
        self.nextObjectID = 0
        self.objects = OrderedDict()
        self.disappeared = OrderedDict()
        self.bbox = OrderedDict()
        self.maxDisappeared = maxDisappeared
        self.maxDistance = maxDistance    

    def register(self, centroid, inputRect):
        self.objects[self.nextObjectID] = centroid
        self.bbox[self.nextObjectID] = inputRect
        self.disappeared[self.nextObjectID] = 0
        self.nextObjectID += 1 

    def deregister(self, objectID):
        del self.objects[objectID]
        del self.disappeared[objectID]
        del self.bbox[objectID]

    