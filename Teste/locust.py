# locustfile.py
from locust import HttpLocust, TaskSet, task
from random import seed
from random import randint
seed(1)
from random import uniform
from locust.contrib.fasthttp import FastHttpLocust

def newpoint():
   return uniform(-180,180), uniform(-90, 90)

points = (newpoint() for x in range(300000))
print(points)
class CalculateCoords(TaskSet):

    def on_start(self):
        self.sendCalcuate()

    def sendCalcuate(self):
        c1 = next(points)
        c2 = next(points)
        c3 = next(points)
        response = self.client.post('/calcular', {'userId': randint(0, 1000), "c1": {"lat": c1[1], "long": c1[0]}, "c2": {"lat": c2[1], "long": c2[0]}, "c3": {"lat": c3[1], "long": c3[0]}  })

class WebsiteUser(FastHttpLocust):
    task_set = CalculateCoords
    max_wait = 5000